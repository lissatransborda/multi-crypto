exports.decryptBifid = (bifidText, keysquare, peorid) => {
    peorid = String(peorid)
    ciphertext = bifidText.toLowerCase().replace(/[^a-z]/g, "").replace(/[j]/g, "i");
    keysquare = keysquare.toLowerCase().replace(/[^a-z]/g, "");
    if (keysquare.length != 25) { return "keysquare must be 25 characters in length" }
    if (keysquare.indexOf("j") >= 0) { return "key should not contain letter j (combine with i)." }
    period = parseInt(peorid.replace(/[^0-9]/g, ""));
    if (isNaN(period)) { return "period should be an integer" }
    if (period <= 0) { return "period should greater than 0" };
    ind = "12345";
    pt1 = "";
    for (i = 0; i < ciphertext.length; i++) {
        index = keysquare.indexOf(ciphertext.charAt(i));
        pt1 += ind.charAt(index / 5) + ind.charAt(index % 5);
    }
    i = 0;
    pt2 = "";
    pt3 = "";
    while (pt1.length - i >= 2 * period) {
        pt2 += pt1.substr(i, period);
        pt3 += pt1.substr(i + period, period);
        i += 2 * period;
    }
    k = (pt1.length - i) / 2;
    if (k >= 1) { pt2 += pt1.substr(i, k);
        pt3 += pt1.substr(i + k, k); }
    text = "";
    for (i = 0; i < pt2.length; i++) { text += keysquare.charAt((parseInt(pt2.charAt(i)) - 1) * 5 + parseInt(pt3.charAt(i) - 1)); }
    return text;
}