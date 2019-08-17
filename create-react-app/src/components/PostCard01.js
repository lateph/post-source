import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import Moment from 'react-moment';

  const PostCard01 = (props) => (
    <Card className={'MuiPostCard--01'}>
      <CardMedia
        className={'MuiCardMedia-root'}
        image={props.source.thumbUrl}
      >
        <div className={'MuiTag--ribbon'}>
          <Typography color={'inherit'} className={'MuiTypography-root'}>
            {props.source.category}
          </Typography>
        </div>
        <Avatar
          className={'MuiAvatar-root'}
        >
        {props.source.creator.firstName.charAt(0)}
        {props.source.creator.lastName.charAt(0)}
        </Avatar>
      </CardMedia>
      <CardContent className={'MuiCardContent-root'}>
        <Typography
          className={'MuiTypography--heading'}
          variant={'h6'}
          gutterBottom
        >
          {props.source.title}
        </Typography>
        <Typography className={'MuiTypography--subheading'} variant={'caption'}>
          {props.source.shortDesc}
        </Typography>
        
        <div>
          {props.source && props.source.tags.map(t => (
            <Chip label={t.name} className={'MuiTypography--chip'}/>
          ))}
        </div>
        
      </CardContent>
      <CardActions className={'MuiCardActions-root'}>
        <Typography variant={'caption'}>
          {/* <Link block href={'javascript:;'} underline={'none'}> */}
            {/* March 8, 2016 */}
            <Moment format="MMMM DD, YYYY">
                {props.source.createdAt}
            </Moment>
          {/* </Link> */}
        </Typography>
        <div>
          <IconButton href={props.source.fileUrl}>
            <Icon>cloud_download</Icon>
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
  
  export default PostCard01;
  