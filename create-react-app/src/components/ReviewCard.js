
  import React from 'react';
  import Avatar from '@material-ui/core/Avatar';
  import Card from '@material-ui/core/Card';
  import CardMedia from '@material-ui/core/CardMedia';
  import CardContent from '@material-ui/core/CardContent';
  import Divider from '@material-ui/core/Divider';
  import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
  
  const faces = [
    'http://i.pravatar.cc/300?img=1',
    'http://i.pravatar.cc/300?img=2',
    'http://i.pravatar.cc/300?img=3',
    'http://i.pravatar.cc/300?img=4',
  ];
  
  const EngagementCard01 = (props) => (
    <Link to={`/post/${props.source.slug}`}  style={{ textDecoration: 'none' }}>
      <Card className={'MuiEngagementCard--01'}>
        <CardMedia
          className={'MuiCardMedia-root'}
          image={props.source.thumbUrl}
        />
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
          {/* <Divider className={'MuiDivider-root'} light />
          {faces.map(face => (
            <Avatar className={'MuiAvatar-root'} key={face} src={face} />
          ))} */}
        </CardContent>
      </Card>
    </Link>
  );
  
  export default EngagementCard01;