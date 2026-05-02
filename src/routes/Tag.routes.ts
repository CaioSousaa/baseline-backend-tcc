import { Router } from 'express';
import { createTag } from '../modules/tag/factories/CreateTagFactory';
import { updateTag } from '../modules/tag/factories/UpdateTagFactory';
import { deleteTag } from '../modules/tag/factories/DeleteTagFactory';
import { ensureAuthenticateMiddleware } from '../shared/http/EnsureAuthenticateMiddleware';

const tagRoutes = Router();

tagRoutes.post('/create', ensureAuthenticateMiddleware, async (req, res) => {
  return createTag().handle(req, res);
});

tagRoutes.put('/:id', ensureAuthenticateMiddleware, async (req, res) => {
  return updateTag().handle(req, res);
});

tagRoutes.delete('/:id', ensureAuthenticateMiddleware, async (req, res) => {
  return deleteTag().handle(req, res);
});

export { tagRoutes };
