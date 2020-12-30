import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    //paddingTop: '66.25%', 
  },
  cardContent: {
    flexGrow: 1,
    overflow: 'auto'
  },
  date: {
    textAlign: 'left',
    fontSize: '1em',
    color: 'gray',

  },
  title: {
    color: 'black',
    textAlign: 'left'
  },
  
  postId: {
    textAlign: 'left',
  }
}));

//onst cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function MenuItem(props) {
  const classes = useStyles();
  const {cards} = props;  

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={10}>
            {cards.map((card) => (
              <Grid item key={card[0]} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link to={{pathname: '/detail', params: String(card[0])}}> 
                  <CardActionArea onClick={() => localStorage.setItem(String(card[0]), JSON.stringify(card))} >
                    <CardMedia>
                      <img className={classes.cardMedia}
                      src={"http://webdatienloi.com:8765" + card[18].substring(0,15)}
                      title="Image title" style={{width:"100%", height:"250px"}} />
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6" component="h3" className={classes.title}>
                        {card[5]}
                      </Typography>
                      <Typography className = {classes.date} > 
                        Diện tích: {card[19]+ 'm2'} - Giá tiền: {card[9]+ ' VND'}
                      </Typography>
                      <Typography className =  {classes.postId}>
                        Mã bài: {card[1]}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}