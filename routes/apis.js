//HTML routes to target


app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  })
  
  app.get("/exercise", (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
  })
  
  app.get('/stats', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'))
  })
  
  // API routes to targer
    
  
  app.get("/api/workouts", (_, res) => {
    User.find()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.post("/api/workouts", (_, res) => {
    User.create({})
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.put("/api/workouts/:id", ({body, params}, res) => {
    User.findByIdAndUpdate(params.id, 
      {$push:{exercises:body}}, 
      {new:true, runValidators: true})
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  }); 
  
  
  app.get('/api/workouts/range', (_, res) => {
    User.find()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  });