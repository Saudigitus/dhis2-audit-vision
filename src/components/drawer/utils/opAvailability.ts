export default function isOpAvailable(allAuthorities: string[], userAuthorities: string[], op: string): boolean {
    if (userAuthorities.includes('ALL')) return true;

    const upperCaseOp = op.toUpperCase();
    const snakeCaseOp = op.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

    const checkAuthority = (list: string[]) => list.some(auth => {
        if (!auth.startsWith('F_') || auth.includes('PRIVATE')) return false;

        // Pattern: F_{OBJECT_NAME}_{ACTION} ou F_{OBJECT_NAME}_PUBLIC_{ACTION}
        // Usamos regex para garantir que o nome do objeto seja exato e não apenas um prefixo
        // (ex: evitar que "PROGRAM_STAGE" coincida com "PROGRAM_STAGE_INSTANCE")
        const pattern = `^F_(${upperCaseOp}|${snakeCaseOp})(_PUBLIC)?_ADD$`;
        const regex = new RegExp(pattern);
        return regex.test(auth);
    });

    const existsInAll = checkAuthority(allAuthorities || []);
    const existsInUser = checkAuthority(userAuthorities || []);

    // 1. Se existe em "all" e não existe no "user", return false
    if (existsInAll && !existsInUser) {
        console.log('1. Existe em "all" e não existe no "user"');
        return true;
    }

    // 2. Se não existe em "all" mas existe no "user", return true
    if (!existsInAll && existsInUser) {
        console.log('2. Não existe em "all" mas existe no "user"');
        return false;
    }

    // 3. Se não existe em ambos, return false
    if (!existsInAll && !existsInUser) {
        console.log('3. Não existe em "all" e em "user"');
        return true;
    }

    // 3. Se não existe em ambos, return false
    if (existsInAll && existsInUser) {
        console.log('4. Existe em "all" e em "user"');
        return false;
    }

    return false
}