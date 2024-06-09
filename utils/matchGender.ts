export const matchGender = (gender: string) => {
    switch(gender) {
        case "M":
            return "ชาย";
        case "F":
            return "หญิง";
        default:
            return "ไม่ระบุ";
    }
}