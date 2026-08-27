import {
  activityService,
  blogService,
  faqService,
  leadService,
  serviceService,
  specialtyService,
  testimonialService,
} from '@/admin/services/api';

export const adminContentService = {
  services: {
    list: serviceService.list,
    get: serviceService.get,
    create: serviceService.create,
    update: serviceService.update,
    remove: serviceService.remove,
  },
  specialties: {
    list: specialtyService.list,
    get: specialtyService.get,
    create: specialtyService.create,
    update: specialtyService.update,
    remove: specialtyService.remove,
  },
  blogs: {
    list: blogService.list,
    get: blogService.get,
    create: blogService.create,
    update: blogService.update,
    remove: blogService.remove,
  },
  faqs: {
    list: faqService.list,
    create: faqService.create,
    update: faqService.update,
    remove: faqService.remove,
  },
  testimonials: {
    list: testimonialService.list,
    create: testimonialService.create,
    update: testimonialService.update,
    remove: testimonialService.remove,
  },
  leads: {
    list: leadService.list,
    update: leadService.update,
    remove: leadService.remove,
  },
  activity: {
    list: activityService.list,
    log: activityService.log,
  },
};
