const db = require('../config/db');

// Créer un article
exports.createArticle = (req, res) => {
  const { titre, auteur, contenu, categorie, hashtags } = req.body;

  if (!titre || !auteur) {
    return res.status(400).json({ message: 'TITRE ET AUTEUR OBLIGATOIRES' });
  }

  const hashtagsString = hashtags ? JSON.stringify(hashtags) : null;

  const sql = `
    INSERT INTO articles (titre, contenu, auteur, categorie, hashtags)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [titre, contenu, auteur, categorie, hashtagsString], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la création', error: err });
    }

    res.status(201).json({
      id: result.insertId,
      titre,
      auteur,
      contenu,
      categorie,
      hashtags
    });
  });
};

// Récupérer tous les articles
exports.getAllArticles = (req, res) => {
  const sql = 'SELECT * FROM articles';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération', error: err });
    }

    const articles = results.map(article => ({
      ...article,
      hashtags: article.hashtags ? JSON.parse(article.hashtags) : []
    }));

    res.status(200).json(articles);
  });
};

// Récupérer un article par son ID
exports.getOneArticle = (req, res) => {
  const sql = 'SELECT * FROM articles WHERE id = ?';

  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'ARTICLE NON TROUVE' });
    }

    const article = {
      ...results[0],
      hashtags: results[0].hashtags ? JSON.parse(results[0].hashtags) : []
    };

    res.status(200).json(article);
  });
};

// Modifier un article
exports.updateArticle = (req, res) => {
  const { titre, contenu, categorie, hashtags } = req.body;
  const id = req.params.id;

  const getSql = 'SELECT * FROM articles WHERE id = ?';

  db.query(getSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'ARTICLE NON TROUVE' });
    }

    const articleActuel = results[0];

    const nouveauTitre = titre || articleActuel.titre;
    const nouveauContenu = contenu || articleActuel.contenu;
    const nouvelleCategorie = categorie || articleActuel.categorie;
    const nouveauxHashtags = hashtags ? JSON.stringify(hashtags) : articleActuel.hashtags;

    const updateSql = `
      UPDATE articles
      SET titre = ?, contenu = ?, categorie = ?, hashtags = ?
      WHERE id = ?
    `;

    db.query(
      updateSql,
      [nouveauTitre, nouveauContenu, nouvelleCategorie, nouveauxHashtags, id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la modification', error: err });
        }

        res.status(200).json({
          message: 'ARTICLE MODIFIE AVEC SUCCES'
        });
      }
    );
  });
};

// Supprimer un article
exports.deleteArticle = (req, res) => {
  const sql = 'DELETE FROM articles WHERE id = ?';

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la suppression', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ARTICLE NON TROUVE' });
    }

    res.status(200).json({ message: 'ARTICLE SUPPRIME' });
  });
};

// Rechercher des articles
exports.searchArticles = (req, res) => {
  const query = `%${req.query.query || ''}%`;

  const sql = `
    SELECT * FROM articles
    WHERE titre LIKE ? OR contenu LIKE ?
  `;

  db.query(sql, [query, query], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la recherche', error: err });
    }

    const articles = results.map(article => ({
      ...article,
      hashtags: article.hashtags ? JSON.parse(article.hashtags) : []
    }));

    res.status(200).json(articles);
  });
};