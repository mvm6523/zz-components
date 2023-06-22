import installer from './defaults'

export * from '@zz-components/el-components'
export * from '@zz-components/constants'
// export * from '@zz-components/directives'
// export * from '@zz-components/hooks'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer
