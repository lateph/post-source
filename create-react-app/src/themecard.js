
  export default ({ palette, spacing }) => ({
    MuiCard: {
      root: {
        '&.MuiEngagementCard--01': {
          transition: '0.3s',
          maxWidth: 304,
          margin: 'auto',
          boxShadow: 'none',
          border: '1px solid #f0f0f0',
        //   boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
          },
          '& .MuiCardMedia-root': {
            paddingTop: '56.25%',
          },
          '& .MuiCardContent-root': {
            textAlign: 'left',
            padding: spacing(3),
          },
          '& .MuiDivider-root': {
            margin: spacing(3, 0),
          },
          '& .MuiTypography--heading': {
            fontWeight: 'bold',
          },
          '& .MuiTypography--subheading': {
            lineHeight: 1.8,
          },
          '& .MuiAvatar-root': {
            display: 'inline-block',
            border: '2px solid white',
            '&:not(:first-of-type)': {
              marginLeft: -spacing(1),
            },
          },
        },
        '&.MuiPostCard--01': {
          transition: '0.3s',
          maxWidth: 304,
          minHeight: '100%',
          margin: 'auto',
          borderRadius: "4px 0px 0px 4px",
          boxShadow: 'none',
          borderRight: '1px solid #f0f0f0',
          // boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
          '&:hover': {
            // transform: 'translateY(-3px)',
            // boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
          },
          
          '& .MuiCardMedia-root': {
            paddingTop: '56.25%',
            position: 'relative',
            '& .MuiTag--ribbon': {
              position: 'absolute',
              top: spacing(2),
              left: spacing(2),
              backgroundColor: palette.secondary.main,
              color: '#ffffff !important',
              padding: '0px 8px',
              filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.6))',
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: 2,
              '&:before, &:after': {
                position: 'absolute',
                right: -16,
                content: '" "',
                borderLeft: `16px solid ${palette.secondary.main}`,
              },
              '&:before': {
                top: 0,
                borderBottom: '12px solid transparent',
              },
              '&:after': {
                bottom: 0,
                borderTop: '12px solid transparent',
              },
              '& .MuiTypography-root': {
                fontWeight: 'bold',
              },
            },
            '& .MuiAvatar-root': {
              position: 'absolute',
              right: '12%',
              bottom: 0,
              transform: 'translateY(20%)',
              width: 48,
              height: 48,
              zIndex: 1,
            },
            '&:after': {
              content: '" "',
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderBottom: '32px solid #ffffff',
              borderLeft: '400px solid transparent',
            },
          },
          '& .MuiCardContent-root': {
            textAlign: 'left',
            padding: spacing(3, 3, 1 , 3),
          },
          '& .MuiChip-root': {
            marginRight: "4px",
            marginTop: "8px",
          },
          '& .MuiTypography--heading': {
            fontWeight: 'bold',
          },
          '& .MuiTypography--subheading': {
            lineHeight: 1.8,
          },
          '& .MuiAvatar-root': {
            backgroundColor: palette.secondary.main
          },
          '& .MuiCardActions-root': {
            padding: spacing(0, 3, 3),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        },
      },
    },
  });