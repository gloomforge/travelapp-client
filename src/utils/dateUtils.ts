/**
 * Formats a date range in a human-readable format
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Formatted date range string
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getFullYear() === end.getFullYear()) {
        if (start.getMonth() === end.getMonth()) {
            return `${start.getDate()} - ${end.getDate()} ${start.toLocaleString('default', { month: 'long' })} ${start.getFullYear()}`;
        }
        return `${start.toLocaleString('default', { month: 'short' })} ${start.getDate()} - ${end.toLocaleString('default', { month: 'short' })} ${end.getDate()}, ${start.getFullYear()}`;
    }
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
}; 