import { useEthers } from '@usedapp/core'

export const Disconnect = () => {
    const { deactivate } = useEthers()
    deactivate()
    window.location.href = 'home'
} 