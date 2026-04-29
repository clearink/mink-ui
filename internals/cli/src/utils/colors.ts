import chalk from 'chalk'

export const colors = {
  error: (text: string) => chalk.hex('#e74c3c')(text),
  info: (text: string) => chalk.hex('#3498db')(text),
  success: (text: string) => chalk.hex('#2ecc71')(text),
  warning: (text: string) => chalk.hex('#f39c12')(text),
}
