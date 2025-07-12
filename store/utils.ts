

export const formatDate = (dateString:any) => {
    const date = new Date(dateString)
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    // const options: Intl.DateTimeFormatOptions = { weekday: 'long' }
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }

    return `${month} ${day}, ${year} (${date.toLocaleDateString('default', options)})`
}