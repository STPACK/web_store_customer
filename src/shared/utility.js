export const  statusFilter = status=>{
    switch (status) {
        case 0: return "waiting for Payment"
        case 1: return "waiting payment verify"
        case 2: return "waiting for shipping"
        case 3: return "completed"
        default:
            return "NO STATUS"
    }
}
export const  statusColor = status=>{
    switch (status) {
        case 0: return "text-warning"
        case 1: return "text-info"
        case 2: return "text-primary"
        case 3: return "text-success"
        default:
            return "text-dark"
    }
}