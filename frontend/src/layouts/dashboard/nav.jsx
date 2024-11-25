import {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import {AppContext} from "../../context/AppContext";
import {Collapse} from "@mui/material";
import List from "@mui/material/List";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
    const {resources} = useContext(AppContext);
    const loggedUser = resources?.loggedUser;

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{loggedUser?.name}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {loggedUser?.email}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );


  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = pathname === item.path;

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton
                component={item.children ? 'button' : RouterLink}
                href={item.path}
                onClick={item.children ? toggleOpen : undefined}
                sx={{
                    typography: 'body2',
                    color: 'text.secondary',
                    borderRadius: 1,
                    fontWeight: isActive ? 'fontWeightBold' : 'fontWeightMedium',
                    bgcolor: isActive ? (theme) => alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    },
                }}
            >
                <Box component="span" sx={{ mr: 2 }}>
                    {item.icon}
                </Box>
                <Typography>{item.title}</Typography>
                {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {item.children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 4 }}>
                        {item.children.map((child) => (
                            <ListItemButton
                                key={child.title}
                                component={RouterLink}
                                href={child.path}
                                sx={{
                                    typography: 'body2',
                                    color: 'text.secondary',
                                    borderRadius: 1,
                                    fontWeight: pathname === child.path ? 'fontWeightBold' : 'fontWeightMedium',
                                    '&:hover': {
                                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                    },
                                }}
                            >
                                {child.title}
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
}

NavItem.propTypes = {
    item: PropTypes.object.isRequired,
};

