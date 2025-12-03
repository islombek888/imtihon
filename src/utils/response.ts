export function success(message: string, data?: any) {
  return { success: true, message, data };
}

export function error(message: string, status = 400) {
  return { success: false, message, status };
}