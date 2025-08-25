function formatPhone(phone: string) {
    let formattedPhone: string;

    if (phone.includes("@")) {
        formattedPhone = phone.replace(/^55/, '').replace(/@c\.us$/, '');
    } else {
        formattedPhone = "55" + phone.replace(/\D/g, '') + "@c.us";
    }

    return formattedPhone;
}

export default formatPhone;
