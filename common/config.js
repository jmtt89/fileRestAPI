exports.Bucket = "Bucket Name";

exports.clientOptions = {
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
};

exports.s3Options = {
  accessKeyId : "accessKeyId",// (String) — your AWS access key ID.
  secretAccessKey : "secretAccessKey",// (String) — your AWS secret access key.
  region : "region",// (String) — the region to send service requests to.
  //sessionToken : "",// (AWS.Credentials) — the optional AWS session token to sign requests with.
  //credentials : "",// (AWS.Credentials) — the AWS credentials to sign requests with. You can either specify this object, or specify the accessKeyId and secretAccessKey options directly.
  //credentialProvider : "",// (AWS.CredentialProviderChain) — the provider chain used to resolve credentials if no static credentials property is set.
  //maxRetries : "",// (Integer) — the maximum amount of retries to attempt with a request
  //maxRedirects : "",// (Integer) — the maximum amount of redirects to follow with a request.
  //sslEnabled : "",// (Boolean) — whether to enable SSL for requests.
  //paramValidation : "",// (Boolean|map) — whether input parameters should be validated against the operation description before sending the request. Defaults to true. Pass a map to enable any of the following specific validation features:
  //min : "",// [Boolean] — Validates that a value meets the min constraint. This is enabled by default when paramValidation is set to true.
  //max : "",// [Boolean] — Validates that a value meets the max constraint.
  //pattern : "",// [Boolean] — Validates that a string value matches a regular expression.
  //enum : "",// [Boolean] — Validates that a string value matches one of the allowable enum values.
  //computeChecksums : "",// (Boolean) — whether to compute checksums for payload bodies when the service accepts it (currently supported in S3 only)
  //convertResponseTypes : "",// (Boolean) — whether types are converted when parsing response data. Currently only supported for JSON based services. Turning this off may improve performance on large response payloads. Defaults to true.
  //correctClockSkew : "",// (Boolean) — whether to apply a clock skew correction and retry requests that fail because of an skewed client clock. Defaults to false.
  //s3ForcePathStyle : "",// (Boolean) — whether to force path style URLs for S3 objects.
  //s3BucketEndpoint : "",// (Boolean) — whether the provided endpoint addresses an individual bucket (false if it addresses the root API endpoint). Note that setting this configuration option requires an endpoint to be provided explicitly to the service constructor.
  //retryDelayOptions : "",// (map) — A set of options to configure the retry delay on retryable errors. Currently supported options are:
  //base : "",// [Integer] — The base number of milliseconds to use in the exponential backoff for operation retries. Defaults to 100 ms.
  //customBackoff : "",// [function] — A custom function that accepts a retry count and returns the amount of time to delay in milliseconds. The base option will be ignored if this option is supplied.
  //httpOptions : "",// (map) — A set of options to pass to the low-level HTTP request. Currently supported options are:
  //proxy : "",// [String] — the URL to proxy requests through
  //agent : "",// [http.Agent, https.Agent] — the Agent object to perform HTTP requests with. Used for connection pooling. Defaults to the global agent (http.globalAgent) for non-SSL connections. Note that for SSL connections, a special Agent object is used in order to enable peer certificate verification. This feature is only available in the Node.js environment.
  //timeout : "",// [Integer] — Sets the socket to timeout after timeout milliseconds of inactivity on the socket. Defaults to two minutes (120000).
  //xhrAsync : "",// [Boolean] — Whether the SDK will send asynchronous HTTP requests. Used in the browser environment only. Set to false to send requests synchronously. Defaults to true (async on).
  //xhrWithCredentials : "",// [Boolean] — Sets the "withCredentials" property of an XMLHttpRequest object. Used in the browser environment only. Defaults to false.
  //apiVersion : "",// (String, Date) — a String in YYYY-MM-DD format (or a date) that represents the latest possible API version that can be used in all services (unless overridden by apiVersions). Specify 'latest' to use the latest possible version.
  //apiVersions : "",// (map<String, String|Date>) — a map of service identifiers (the lowercase service class name) with the API version to use when instantiating a service. Specify 'latest' for each individual that can use the latest available version.
  //logger : "",// (#write, #log) — an object that responds to .write() (like a stream) or .log() (like the console object) in order to log information about requests
  //systemClockOffset : "",// (Number) — an offset value in milliseconds to apply to all signing times. Use this to compensate for clock skew when your system may be out of sync with the service time. Note that this configuration option can only be applied to the global AWS.config object and cannot be overridden in service-specific configuration. Defaults to 0 milliseconds.
  //signatureVersion : "",// (String) — the signature version to sign requests with (overriding the API configuration). Possible values are: 'v2', 'v3', 'v4'.
  //signatureCache : "",// (Boolean) — whether the signature to sign requests with (overriding the API configuration) is cached. Only applies to the signature version 'v4'. Defaults to true.

  //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
};

