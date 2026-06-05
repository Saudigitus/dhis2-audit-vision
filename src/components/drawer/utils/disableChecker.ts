/**
 * Determines if the rollback functionality should be disabled for a specific operation,
 * based on user authorities and available system authorities.
 * 
 * @param allAuthorities List of all authorities available in the system.
 * @param userAuthorities List of authorities the current user possesses.
 * @param op Name of the object/operation (e.g., 'program', 'dataElement').
 * @returns true if rollback should be DISABLED, false otherwise.
 */
export default function shouldDisableRollback(allAuthorities: string[], userAuthorities: string[], op: string): boolean {
    // If the operation is not defined, disable rollback for safety.
    if (!op) return true;

    // If the user has 'ALL' authority, they have full permission and rollback should not be disabled.
    if (userAuthorities.includes('ALL')) return false;

    const upperCaseOp = op.toUpperCase();
    const snakeCaseOp = op.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

    /**
     * Checks if an authority list contains the addition permission for the specific object.
     * Looks for patterns like F_{OBJECT}_ADD or F_{OBJECT}_PUBLIC_ADD.
     */
    const checkAuthority = (list: string[]) => list.some(auth => {
        if (!auth.startsWith('F_') || auth.includes('PRIVATE')) return false;

        // Pattern: F_{OBJECT_NAME}_{ACTION} or F_{OBJECT_NAME}_PUBLIC_{ACTION}
        // We use regex to ensure the object name is exact and not just a prefix
        // (e.g., to prevent "PROGRAM_STAGE" from matching "PROGRAM_STAGE_INSTANCE")
        const pattern = `^F_(${upperCaseOp}|${snakeCaseOp})(_PUBLIC)?_ADD$`;
        const regex = new RegExp(pattern);
        return regex.test(auth);
    });

    const existsInAll = checkAuthority(allAuthorities || []);
    const existsInUser = checkAuthority(userAuthorities || []);

    // 1. If the authority exists in the system but the user doesn't have it, disable rollback.
    if (existsInAll && !existsInUser) {
        return true;
    }

    // 2. If the authority doesn't exist in the system but the user has it, allow rollback.
    if (!existsInAll && existsInUser) {
        return false;
    }

    // 3. If the authority doesn't exist in either, disable rollback for safety (verification failure).
    if (!existsInAll && !existsInUser) {
        return true;
    }

    // 4. If the authority exists in both, user has permission and rollback is enabled.
    if (existsInAll && existsInUser) {
        return false;
    }

    return false
}