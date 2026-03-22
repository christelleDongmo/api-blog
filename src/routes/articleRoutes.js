const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupère tous les articles
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: Liste des articles
 */
router.get('/', articleController.getAllArticles);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Crée un nouvel article
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 example: Mon premier article
 *               contenu:
 *                 type: string
 *                 example: Ceci est le contenu de l'article
 *               auteur:
 *                 type: string
 *                 example: Christie
 *               categorie:
 *                 type: string
 *                 example: Tech
 *               hashtags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [node, express]
 *             required:
 *               - titre
 *               - auteur
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Titre et auteur obligatoires
 */
router.post('/', articleController.createArticle);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles par mot-clé
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Mot-clé à rechercher dans le titre ou le contenu
 *     responses:
 *       200:
 *         description: Liste des articles trouvés
 */
router.get('/search', articleController.searchArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupère un article par son ID
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article trouvé
 *       404:
 *         description: Article non trouvé
 */
router.get('/:id', articleController.getOneArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 example: Article mis à jour
 *               contenu:
 *                 type: string
 *                 example: Nouveau contenu
 *               categorie:
 *                 type: string
 *                 example: Education
 *               hashtags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [api, update]
 *     responses:
 *       200:
 *         description: Article modifié avec succès
 *       404:
 *         description: Article non trouvé
 */
router.put('/:id', articleController.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à supprimer
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article non trouvé
 */
router.delete('/:id', articleController.deleteArticle);

module.exports = router;