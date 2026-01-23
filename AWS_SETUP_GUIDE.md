# AWS Setup Guide - S3 Configuration for Car Management System

## 📋 Table of Contents
1. [S3 Bucket Creation](#s3-bucket-creation)
2. [IAM Role Setup](#iam-role-setup)
3. [EC2 Configuration](#ec2-configuration)
4. [Verification](#verification)
5. [Troubleshooting](#troubleshooting)

---

## S3 Bucket Creation

### Step 1: Create S3 Bucket

```bash
# Using AWS CLI
aws s3 mb s3://vinfast-car-images --region us-east-1

# Or via AWS Console
# Services > S3 > Create Bucket
# - Bucket name: vinfast-car-images
# - Region: us-east-1
# - Block Public Access: OFF (to allow public read)
```

### Step 2: Configure Bucket Policy

Create a policy to allow public read access:

```bash
# Save this as bucket-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::vinfast-car-images/*"
    }
  ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy \
  --bucket vinfast-car-images \
  --policy file://bucket-policy.json \
  --region us-east-1
```

### Step 3: Configure CORS (if frontend is on different domain)

```bash
# Save this as cors-config.json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "ExposeHeaders": ["ETag", "x-amz-version-id"],
    "MaxAgeSeconds": 3000
  }
]
```

Apply CORS configuration:
```bash
aws s3api put-bucket-cors \
  --bucket vinfast-car-images \
  --cors-configuration file://cors-config.json \
  --region us-east-1
```

### Step 4: Enable Versioning (Optional but Recommended)

```bash
aws s3api put-bucket-versioning \
  --bucket vinfast-car-images \
  --versioning-configuration Status=Enabled \
  --region us-east-1
```

### Step 5: Enable Server-Side Encryption (Recommended)

```bash
aws s3api put-bucket-encryption \
  --bucket vinfast-car-images \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }' \
  --region us-east-1
```

---

## IAM Role Setup

### Step 1: Create IAM Role

```bash
# Create role for EC2
aws iam create-role \
  --role-name EC2-S3-CarManagement \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }]
  }'
```

### Step 2: Create Custom S3 Policy

Create a file named `s3-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::vinfast-car-images",
        "arn:aws:s3:::vinfast-car-images/*"
      ]
    }
  ]
}
```

### Step 3: Attach Policy to Role

```bash
# Option A: Attach custom policy
aws iam put-role-policy \
  --role-name EC2-S3-CarManagement \
  --policy-name S3-CarManagement-Policy \
  --policy-document file://s3-policy.json

# Option B: Attach AWS managed policy (simpler but less restrictive)
aws iam attach-role-policy \
  --role-name EC2-S3-CarManagement \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
```

### Step 4: Create Instance Profile

```bash
# Create instance profile
aws iam create-instance-profile \
  --instance-profile-name EC2-S3-CarManagement-Profile

# Add role to instance profile
aws iam add-role-to-instance-profile \
  --instance-profile-name EC2-S3-CarManagement-Profile \
  --role-name EC2-S3-CarManagement
```

---

## EC2 Configuration

### Step 1: Attach IAM Role to Existing EC2 Instance

```bash
# List your instances
aws ec2 describe-instances \
  --region us-east-1 \
  --query 'Reservations[*].Instances[*].[InstanceId,Tags[?Key==`Name`].Value|[0]]' \
  --output table

# Get instance ID from output, then attach role
aws ec2 associate-iam-instance-profile \
  --iam-instance-profile Name=EC2-S3-CarManagement-Profile \
  --instance-id i-0123456789abcdef0 \
  --region us-east-1
```

### Step 2: Launch New EC2 with Role (Alternative)

```bash
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.medium \
  --iam-instance-profile Name=EC2-S3-CarManagement-Profile \
  --region us-east-1
```

### Step 3: SSH into EC2 and Verify

```bash
# Connect to EC2
ssh -i your-key.pem ec2-user@your-instance-ip

# Verify IAM role is attached
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/

# Should output: EC2-S3-CarManagement

# Test S3 access
aws s3 ls s3://vinfast-car-images/ --region us-east-1
```

---

## Verification

### Check S3 Bucket Configuration

```bash
# 1. Verify bucket policy
aws s3api get-bucket-policy \
  --bucket vinfast-car-images \
  --region us-east-1

# 2. Verify CORS
aws s3api get-bucket-cors \
  --bucket vinfast-car-images \
  --region us-east-1

# 3. Verify versioning
aws s3api get-bucket-versioning \
  --bucket vinfast-car-images \
  --region us-east-1

# 4. Verify encryption
aws s3api get-bucket-encryption \
  --bucket vinfast-car-images \
  --region us-east-1
```

### Check IAM Role Configuration

```bash
# 1. Get role info
aws iam get-role --role-name EC2-S3-CarManagement

# 2. List role policies
aws iam list-role-policies --role-name EC2-S3-CarManagement

# 3. Check instance profile
aws iam get-instance-profile \
  --instance-profile-name EC2-S3-CarManagement-Profile
```

### Test Upload from EC2

```bash
# SSH into EC2
ssh -i your-key.pem ec2-user@your-instance-ip

# Create a test file
echo "Test content" > test.txt

# Upload to S3
aws s3 cp test.txt s3://vinfast-car-images/test.txt --region us-east-1

# Verify it's public
curl https://vinfast-car-images.s3.amazonaws.com/test.txt
```

---

## Troubleshooting

### Issue 1: NoCredentialsError

**Symptoms**: 
```
Error: NoCredentialsError - AWS credentials not found
```

**Solution**:
```bash
# 1. Check if IAM role is attached
aws ec2 describe-iam-instance-profile-associations \
  --region us-east-1

# 2. If not attached, attach it
aws ec2 associate-iam-instance-profile \
  --iam-instance-profile Name=EC2-S3-CarManagement-Profile \
  --instance-id i-xxxxxxxxx \
  --region us-east-1

# 3. Restart node application
```

### Issue 2: Access Denied

**Symptoms**:
```
Error: User: arn:aws:iam::xxx:role/EC2-S3-CarManagement is not authorized
```

**Solution**:
```bash
# 1. Verify policy is attached
aws iam get-role-policy \
  --role-name EC2-S3-CarManagement \
  --policy-name S3-CarManagement-Policy

# 2. Check if all required actions are allowed:
# - s3:GetObject
# - s3:PutObject
# - s3:DeleteObject
# - s3:ListBucket

# 3. Reattach policy if needed
aws iam put-role-policy \
  --role-name EC2-S3-CarManagement \
  --policy-name S3-CarManagement-Policy \
  --policy-document file://s3-policy.json
```

### Issue 3: Bucket Policy Blocks Access

**Symptoms**:
```
Error: Access Denied - Bucket policy denies access
```

**Solution**:
```bash
# 1. Check bucket policy
aws s3api get-bucket-policy --bucket vinfast-car-images

# 2. Make sure it has proper Principal
# - Should allow EC2 role ARN: arn:aws:iam::ACCOUNT:role/EC2-S3-CarManagement
# - Or use wildcard "*" for public access

# 3. Update policy
aws s3api put-bucket-policy \
  --bucket vinfast-car-images \
  --policy file://bucket-policy.json
```

### Issue 4: Images Not Public

**Symptoms**:
```
Cannot access image via URL: https://vinfast-car-images.s3.amazonaws.com/cars/...
```

**Solution**:
```bash
# 1. Verify bucket is not blocking public access
aws s3api get-public-access-block --bucket vinfast-car-images

# 2. If blocking, disable it
aws s3api put-public-access-block \
  --bucket vinfast-car-images \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 3. Verify bucket policy allows public read
aws s3api get-bucket-policy --bucket vinfast-car-images
```

### Issue 5: CORS Errors

**Symptoms**:
```
Cross-Origin Request Blocked: https://yourdomain.com can't access S3
```

**Solution**:
```bash
# 1. Check current CORS
aws s3api get-bucket-cors --bucket vinfast-car-images

# 2. Update with correct domain
cat > cors-config.json << EOF
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
EOF

aws s3api put-bucket-cors \
  --bucket vinfast-car-images \
  --cors-configuration file://cors-config.json
```

---

## Security Best Practices

### 1. Enable CloudTrail for Audit

```bash
aws cloudtrail create-trail \
  --name car-management-s3-trail \
  --s3-bucket-name car-management-audit-logs

aws cloudtrail start-logging \
  --trail-name car-management-s3-trail
```

### 2. Set Bucket Lifecycle Policy

```bash
# Delete old images after 30 days (optional)
cat > lifecycle-policy.json << EOF
{
  "Rules": [
    {
      "Id": "DeleteOldImages",
      "Status": "Enabled",
      "Prefix": "cars/",
      "NoncurrentVersionExpirationInDays": 30,
      "ExpirationInDays": 365
    }
  ]
}
EOF

aws s3api put-bucket-lifecycle-configuration \
  --bucket vinfast-car-images \
  --lifecycle-configuration file://lifecycle-policy.json
```

### 3. Monitor S3 Metrics

```bash
# Enable CloudWatch metrics
aws s3api put-bucket-metrics-configuration \
  --bucket vinfast-car-images \
  --id EntireBucket \
  --metrics-configuration '{"Id":"EntireBucket","Filter":{"Prefix":""}}'
```

### 4. Regular Access Review

```bash
# Audit who accessed S3
aws s3api get-bucket-logging --bucket vinfast-car-images

# Review CloudTrail events
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=ResourceName,AttributeValue=vinfast-car-images \
  --max-results 50
```

---

## Cost Optimization

### 1. Use S3 Standard-IA for Images Older Than 30 Days

```bash
cat > tiered-storage-policy.json << EOF
{
  "Rules": [
    {
      "Id": "TransitionToIA",
      "Status": "Enabled",
      "Prefix": "cars/",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        }
      ]
    }
  ]
}
EOF

aws s3api put-bucket-lifecycle-configuration \
  --bucket vinfast-car-images \
  --lifecycle-configuration file://tiered-storage-policy.json
```

### 2. Monitor Costs

```bash
# Use AWS Cost Explorer
# Or setup billing alerts in AWS Console
aws ce get-cost-and-usage \
  --time-period Start=2024-01-01,End=2024-01-31 \
  --granularity MONTHLY \
  --metrics BlendedCost
```

---

## Cleanup (When Needed)

```bash
# WARNING: This will delete bucket and all contents!

# 1. Empty bucket
aws s3 rm s3://vinfast-car-images --recursive

# 2. Delete bucket
aws s3 rb s3://vinfast-car-images

# 3. Delete IAM role (detach policies first)
aws iam delete-role-policy \
  --role-name EC2-S3-CarManagement \
  --policy-name S3-CarManagement-Policy

aws iam remove-role-from-instance-profile \
  --instance-profile-name EC2-S3-CarManagement-Profile \
  --role-name EC2-S3-CarManagement

aws iam delete-instance-profile \
  --instance-profile-name EC2-S3-CarManagement-Profile

aws iam delete-role --role-name EC2-S3-CarManagement
```

---

## Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [IAM Roles for EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)
- [AWS CLI Reference](https://docs.aws.amazon.com/cli/latest/)

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**Status**: Complete ✅
