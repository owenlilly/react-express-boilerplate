

export default function UserApiController(app){
  
  app.get('/api/login', (req, res) => {
    res.status(401).json({error: 'Invalid email or password'});
  });
}