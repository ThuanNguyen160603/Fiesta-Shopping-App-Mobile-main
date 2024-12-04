export const formatTime = (data) => {
    const time = new Date(data)
    const day = time.getDate()
    const month = time.getMonth() + 1
    const year = time.getFullYear()
    const formattedVNITime = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    return { day, month, year, formattedVNITime }
}
