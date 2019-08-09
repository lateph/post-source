
  export default ({ spacing }) => ({
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
      },
    },
  });