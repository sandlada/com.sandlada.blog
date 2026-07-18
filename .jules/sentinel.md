## 2026-07-18 - Path Traversal in S3 Downloader
**Vulnerability:** The standalone script `download-articles.js` used S3 object keys directly to construct local file paths without checking if the resolved path stayed within the intended base directory.
**Learning:** This existed because S3 object keys are implicitly trusted as file paths, but if an attacker compromises the S3 bucket or modifies keys to include directory traversals (`../../../`), it can lead to arbitrary file overwrites when the downloader runs locally.
**Prevention:** Always resolve the absolute base and target paths, and verify that the target path strictly starts with the base path (plus the path separator) before performing any local file system operations using data from external storage buckets.
