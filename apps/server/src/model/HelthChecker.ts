export interface Healthcheck {
  uptime: number
  message: string | Error
  timestamp: number
  appStatus?: string
}
