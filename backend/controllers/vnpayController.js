const moment = require('moment');
const qs = require('qs');
const crypto = require('crypto');
const Deposit = require('../models/Deposit');
const Transaction = require('../models/Transaction');

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj){
        if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

exports.createPaymentUrl = async (req, res) => {
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        
        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let tmnCode = process.env.VNP_TMN_CODE;
        let secretKey = process.env.VNP_HASH_SECRET;
        let vnpUrl = process.env.VNP_URL;
        let returnUrl = process.env.VNP_RETURN_URL;

        let depositId = req.body.depositId;
        let amount = req.body.amount;
        let bankCode = req.body.bankCode;
        
        let locale = req.body.language;
        if(locale === null || locale === '' || locale === undefined){
            locale = 'vn';
        }
        
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = depositId; // Use deposit ID as transaction reference
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan dat coc cho ma GD:' + depositId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100; // VNPay requires amount to be multiplied by 100
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        
        if(bankCode !== null && bankCode !== '' && bankCode !== undefined){
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

        res.status(200).json({ paymentUrl: vnpUrl });
    } catch (err) {
        console.error('Error creating VNPay URL:', err);
        res.status(500).json({ message: 'Lỗi khi tạo URL thanh toán', error: err.message });
    }
};

exports.vnpayReturn = async (req, res) => {
    try {
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        let secretKey = process.env.VNP_HASH_SECRET;
        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

        if(secureHash === signed){
            if (vnp_Params['vnp_ResponseCode'] === '00') {
                // FALLBACK CHO LOCALHOST: Cập nhật DB luôn ở Return URL vì IPN không gọi được vào localhost
                let depositId = vnp_Params['vnp_TxnRef'];
                let deposit = await Deposit.findById(depositId);
                
                if (deposit && deposit.status === 'pending') {
                    deposit.status = 'confirmed';
                    await deposit.save();
                    
                    const transaction = new Transaction({
                        depositId: deposit._id,
                        customerId: deposit.customerId,
                        amount: deposit.depositAmount,
                        paymentMethod: 'vnpay',
                        description: `Thanh toán đặt cọc qua VNPay cho mã ${deposit._id}`,
                        reference: `VNPay-${vnp_Params['vnp_TransactionNo']}`,
                        status: 'completed'
                    });
                    await transaction.save();
                }
            }

            // Redirect to frontend result page with parameters
            let frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            let status = vnp_Params['vnp_ResponseCode'] === '00' ? 'success' : 'failed';
            return res.redirect(`${frontendUrl}/payment-result?status=${status}&depositId=${vnp_Params['vnp_TxnRef']}&amount=${vnp_Params['vnp_Amount']}`);
        } else{
            let frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            return res.redirect(`${frontendUrl}/payment-result?status=failed&reason=checksum_invalid`);
        }
    } catch (err) {
        console.error('Error in VNPay return:', err);
        res.status(500).json({ message: 'Lỗi xử lý kết quả thanh toán', error: err.message });
    }
};

exports.vnpayIpn = async (req, res) => {
    try {
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];
        
        let rspCode = vnp_Params['vnp_ResponseCode'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        let secretKey = process.env.VNP_HASH_SECRET;
        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");     
        
        let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu hệ thống của đơn vị.
        
        let checkOrderId = true; // Code để kiểm tra mã đơn hàng (depositId) có tồn tại hay không.
        let checkAmount = true; // Code kiểm tra số tiền khớp hay không.
        
        let depositId = vnp_Params['vnp_TxnRef'];
        let deposit = await Deposit.findById(depositId);
        
        if (!deposit) {
            checkOrderId = false;
        } else {
            // Kiểm tra số tiền
            if (deposit.depositAmount * 100 !== parseInt(vnp_Params['vnp_Amount'], 10)) {
                checkAmount = false;
            }
            if (deposit.status !== 'pending') {
                // Đã được xử lý
                paymentStatus = '1'; // Đã xử lý (Thành công) hoặc '2' (Lỗi)
            }
        }

        if(secureHash === signed){
            if(checkOrderId){
                if(checkAmount){
                    if(paymentStatus == '0'){
                        if(rspCode == '00'){
                            // Thanh toán thành công
                            deposit.status = 'confirmed';
                            await deposit.save();
                            
                            // Tạo Transaction
                            const transaction = new Transaction({
                                depositId: deposit._id,
                                customerId: deposit.customerId,
                                amount: deposit.depositAmount,
                                paymentMethod: 'vnpay',
                                description: `Thanh toán đặt cọc qua VNPay cho mã ${deposit._id}`,
                                reference: `VNPay-${vnp_Params['vnp_TransactionNo']}`,
                                status: 'completed'
                            });
                            await transaction.save();

                            res.status(200).json({RspCode: '00', Message: 'Success'})
                        }
                        else {
                            // Thanh toán thất bại
                            deposit.status = 'cancelled';
                            deposit.notes = (deposit.notes || '') + ' - Thanh toán VNPay thất bại';
                            await deposit.save();
                            res.status(200).json({RspCode: '00', Message: 'Success'})
                        }
                    }
                    else{
                        res.status(200).json({RspCode: '02', Message: 'This order has been updated to the payment status'})
                    }
                }
                else{
                    res.status(200).json({RspCode: '04', Message: 'Amount invalid'})
                }
            }       
            else {
                res.status(200).json({RspCode: '01', Message: 'Order not found'})
            }
        }
        else {
            res.status(200).json({RspCode: '97', Message: 'Checksum failed'})
        }
    } catch (err) {
        console.error('Error in VNPay IPN:', err);
        res.status(500).json({ message: 'Lỗi xử lý IPN', error: err.message });
    }
};
