import { Router } from 'express';

import { requireAuth } from '../../middlewares/auth';
import { ProjectController } from './project.controller';

const router = Router();

router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getProjectBySlug);

// protected
router.post('/', ProjectController.createProject);
router.put('/:id', requireAuth, ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);
// router.delete('/:id', requireAuth, ProjectController.deleteProject);

export const ProjectRouter = router;

