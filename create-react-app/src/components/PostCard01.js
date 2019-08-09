
  import React from 'react';
  import Avatar from '@material-ui/core/Avatar';
  import Card from '@material-ui/core/Card';
  import CardMedia from '@material-ui/core/CardMedia';
  import CardContent from '@material-ui/core/CardContent';
  import CardActions from '@material-ui/core/CardActions';
  import Link from '@material-ui/core/Link';
  import Typography from '@material-ui/core/Typography';
  import IconButton from '@material-ui/core/IconButton';
  import Icon from '@material-ui/core/Icon';
  
  const PostCard01 = () => (
    <Card className={'MuiPostCard--01'}>
      <CardMedia
        className={'MuiCardMedia-root'}
        image={
          'https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80'
        }
      >
        <div className={'MuiTag--ribbon'}>
          <Typography color={'inherit'} className={'MuiTypography-root'}>
            Norway
          </Typography>
        </div>
        <Avatar
          className={'MuiAvatar-root'}
          src={'http://i.pravatar.cc/300?img=5'}
        />
      </CardMedia>
      <CardContent className={'MuiCardContent-root'}>
        <Typography
          className={'MuiTypography--heading'}
          variant={'h6'}
          gutterBottom
        >
          First Snow Storm
        </Typography>
        <Typography className={'MuiTypography--subheading'} variant={'caption'}>
          Snow storm coming in Sommaroy island, Arctic Norway. This is something
          that you definitely wanna see in your life.
        </Typography>
      </CardContent>
      <CardActions className={'MuiCardActions-root'}>
        <Typography variant={'caption'}>
          <Link block href={'javascript:;'} underline={'none'}>
            March 8, 2016
          </Link>
        </Typography>
        <div>
          <IconButton>
            <Icon>share</Icon>
          </IconButton>
          <IconButton>
            <Icon>favorite_border_rounded</Icon>
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
  
  export default PostCard01;
  