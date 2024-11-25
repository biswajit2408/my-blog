import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    children: [ // Submenu items
      {
        title: 'List',
        path: '/dashboard/user/list',
      },
      {
        title: 'Create',
        path: '/dashboard/user/add',
      },
    ],
  },
  {
    title: 'groups',
    path: '/dashboard/group',
    icon: icon('ic_group'),
  },
  {
    title: 'permissions and roles',
    path: '/products',
    icon: icon('ic_permissions'),
  }
];

export default navConfig;
