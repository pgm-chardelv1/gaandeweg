import { CacheInterceptorService } from './cache-interceptor.service';
import { CategoryService } from './category.service';
import { ExerciseService } from './exercise.service';
import { ExerciseFormService } from './exercise-form.service';
import { InfoService } from './info.service';
import { LoggingService } from './logging.service';
import { UserExerciseService } from './user-exercise.service';
import { HttpHeaders } from '@angular/common/http';
import { SEOService } from './seo.service';

const corsHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
});
const httpOpts = { headers: corsHeaders, params: { _useCache: 'true' } };

export {
  httpOpts,
  CacheInterceptorService,
  CategoryService,
  ExerciseFormService,
  ExerciseService,
  InfoService,
  LoggingService,
  SEOService,
  UserExerciseService,
};
