import { Router } from 'express';
import { createTag } from '../modules/tag/factories/CreateTagFactory';
import { ensureAuthenticateMiddleware } from '../shared/http/EnsureAuthenticateMiddleware';

const tagRoutes = Router();

tagRoutes.post('/create', ensureAuthenticateMiddleware, async (req, res) => {
  return createTag().handle(req, res);
});

export { tagRoutes };
