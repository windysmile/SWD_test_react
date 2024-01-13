function randomString(): string {
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890";
    const lenString: number = 7;
    let randomstring: string = '';

    for (let i = 0; i < lenString; i++) {
        let rnum = Math.floor(Math.random() * characters.length);
        randomstring += characters.substring(rnum, rnum + 1);
    }

    return randomstring;
}

export default randomString;