const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })
  .then(TagData => res.json(TagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })
  .then(TagData => {
    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(TagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  ag.create({
    tag_name: req.body.tag_name
  })
  .then(TagData => res.json(TagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(TagData => {
    if (!TagData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
    }
    res.json(TagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(TagData => {
    if (!TagData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
    }
    res.json(TagData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);// delete on tag by its `id` value
  });
});

module.exports = router;
