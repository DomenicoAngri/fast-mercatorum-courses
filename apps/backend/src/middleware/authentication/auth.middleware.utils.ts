/**
 * Checks for SQL injection patterns in a string.
 *
 * @param input String to check for SQL injection patterns.
 * @returns true if SQL injection patterns are detected.
 */
export const containsSqlInjectionPatterns = (input: string): boolean => {
    // Convert to uppercase for case-insensitive checks.
    const upperInput = input.toUpperCase();

    // Common SQL keywords and patterns to detect.
    const sqlPatterns = [
        "SELECT",
        "INSERT",
        "UPDATE",
        "DELETE",
        "DROP",
        "CREATE",
        "ALTER",
        "TRUNCATE",
        "UNION",
        "JOIN",
        "EXEC",
        "EXECUTE",
        "--",
        "/*",
        "*/",
        ";",
        "=",
    ];

    // Check for each pattern.
    for (const pattern of sqlPatterns) {
        if (upperInput.includes(pattern)) {
            return true;
        }
    }

    // Check for common SQL injection attempts.
    const sqlInjectionRegex = [
        // 'OR ''='
        /'\s*OR\s*'.*'\s*=\s*'/i,

        // 'OR 1=1
        /'\s*OR\s*1\s*=\s*1/i,

        // '; DROP TABLE
        /'\s*;\s*DROP\s*TABLE/i,

        // '; DELETE FROM
        /'\s*;\s*DELETE\s*FROM/i,
    ];

    for (const regex of sqlInjectionRegex) {
        if (regex.test(input)) {
            return true;
        }
    }

    // Allow only alphanumeric characters, underscore, hyphen, dot, and @ for usernames.
    const validCharactersRegex = /^[a-zA-Z0-9_\-\.@]+$/;
    
    return !validCharactersRegex.test(input);
};
