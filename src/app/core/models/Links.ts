interface NavItem{
    path: string;
    title: string;
    icon?: string;
}

const Links: NavItem[] = [
    // {
    //     path: 'usuarios',
    //     title: 'Usuarios',
    //     icon: 'manage_accounts'
    // },
    {
        path: 'alumnos',
        title: 'Alumnos',
        icon: 'group'
    },
    {
        path: 'cursos',
        title: 'Cursos',
        icon: 'widgets'
    },
    {
        path: 'inscripciones',
        title: 'Inscripciones',
        icon: 'view_kanban'
    }
]

export default Links;