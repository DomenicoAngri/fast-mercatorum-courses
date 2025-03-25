export interface JwtPayload {
    // Campi standard JWT
    sub: number | string; // Subject (ID utente)
    iat: number; // Issued At (timestamp di emissione)
    exp: number; // Expiration Time (timestamp di scadenza)

    // Campi personalizzati
    username: string; // Username o email dell'utente
    role?: string; // Ruolo dell'utente (opzionale)
    permissions?: string[]; // Permessi specifici (opzionale)
}

export interface AuthRequest extends Request {
    // Dati dell'utente autenticato (dal token JWT)
    user?: JwtPayload;

    // Token originale (potrebbe essere utile conservarlo)
    token?: string;

    // Helper per verificare i permessi (opzionale, ma comodo)
    hasPermission?: (permission: string) => boolean;

    // Flag di autenticazione (per una verifica rapida)
    isAuthenticated?: boolean;

    // Metadati aggiuntivi dell'autenticazione
    auth?: {
        tokenExp?: number; // Timestamp di scadenza
        issuedAt?: number; // Timestamp di emissione
        provider?: string; // Provider di autenticazione (es. "jwt", "oauth")
    };
}
