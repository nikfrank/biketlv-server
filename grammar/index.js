module.exports = ({
  findAll: (schema, schemaName) =>
    (req, res)=> schema.findAll({})
                       .then(rows => res.json({ schemaName, payload: rows }))
                       .catch(err => res.status(err.code || 500).json({ schemaName, err })),
  
  create: (schema, schemaName) =>
    (req, res)=> schema.create(req.body.payload)
                       .then(createdRow => res.json({ schemaName, payload: [createdRow] }))
                       .catch(err => res.status(err.code || 500).json({ schemaName, err })),
  
  deprecate: (schema, schemaName) =>
    (req, res)=> schema.destroy({ where: { id: +req.params.id  } })
                       .then((a) => res.json({ schemaName, payload: +req.params.id, message: a, newState: 'deleted' }))
                       .catch(err => res.status(err.code || 500).json({ schemaName, err })),
  
  findById: (schema, schemaName) =>
    (req, res)=> schema.findById( +req.params.id )
                       .then(row => res.json({ schemaName, payload: row }))
                       .catch(err => res.status(err.code || 500).json({ schemaName, err })),
  
  patch: (schema, schemaName) =>
    (req, res)=> schema.findById( +req.params.id )
                       .then(row =>
                         (row ? (
                           row.update(req.body.payload)
                              .then(patchedRow => res.json({ schemaName, payload: [patchedRow], newState: 'patched' }))
                         ) : Promise.reject(schemaName + ', id: ' + (req.params.id) + ' not found')
                         ) )
                       .catch(err => res.status(err.code || 500).json({ schemaName, err })),
});

// later add querying!
