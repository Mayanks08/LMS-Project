import {Router} from 'express'
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId,  deleteCourseById, removeLectureFromCourseById, updateCourseById } from '../controllers/course-controller.js';
import {isLoggedIn,  authorizedRoles } from '../middlewares/auth_middle.js';
import upload from '../middlewares/Multer-middle.js';

const router = Router();

router.get('/',getAllCourses);
router.post('/',isLoggedIn, authorizedRoles('ADMIN'),
    upload.single("thumbnail"),createCourse);
router.delete('/',isLoggedIn, authorizedRoles('ADMIN'),removeLectureFromCourseById)

router.get('/:id',isLoggedIn, authorizedRoles('ADMIN'),getLecturesByCourseId);
router.put('/:id',isLoggedIn, authorizedRoles('ADMIN'),updateCourseById)
router.delete('/:id',isLoggedIn, authorizedRoles('ADMIN'),deleteCourseById)
router.post('/:id',isLoggedIn, authorizedRoles('ADMIN'),upload.single("lecture"),addLectureToCourseById);

export  default router
