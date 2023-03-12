import React from 'react'
import useSettings from 'app/hooks/useSettings'
import SecondarySidebarToggle from './SecondarySidebarToggle'
import SecondarySidebarContent from './SecondarySidebarContent'
import SecondarySidenavTheme from '../MatxTheme/SecondarySidenavTheme/SecondarySidenavTheme'

const SecondarySidebar = () => {
    const { settings } = useSettings()
    const secondarySidebarTheme =
        settings.themes[settings.secondarysidebar.theme]

    return (
        <SecondarySidenavTheme theme={secondarySidebarTheme}>
            {settings.secondarysidebar.open && <SecondarySidebarContent />}
            <SecondarySidebarToggle />
        </SecondarySidenavTheme>
    )
}

export default SecondarySidebar
