export const spriteSvg = new URL('@/assets/icons/sprite.svg', import.meta.url).href

/**
 * Get hash and session data
 *
 * @returns {[{hash: string, sessionId: string,...}]} hash data
 */
export function fetchHashToken() {
  return apiInteresneeInstance
    .get('/sign-form.php')
    .then(response => response.data);
}

/**
 * Send information about the applicant to the API for save to file.
 *
 * @return {array}
 * @param params
 */
export async function sendResume(params) {
  const data = new FormData();

  data.append('campCity', params.campCity);
  data.append('city', params.city);
  data.append('email', params.email);
  data.append('firstname', params.firstname);
  data.append('jobID', params.jobID);
  data.append('lastname', params.lastname);
  data.append('phone', params.phone);
  data.append('resumeFile', params.resumeFile);
  data.append('resumeFileName', params.resumeFileName);
  data.append('resumeText', params.resumeText);
  data.append('vacancy', params.vacancy);

  if (params.fromCampPage) {
    data.append('achievements', params.achievements);
    data.append('department', params.department);
    data.append('diploma', params.diploma);
    data.append('expectations', params.expectations);
    data.append('feedback', params.feedback);
    data.append('fromCampPage', params.fromCampPage);
    data.append('hobby', params.hobby);
    data.append('languages', params.languages);
    data.append('link', params.link);
    data.append('specialty', params.specialty);
    data.append('study', params.study);
    data.append('university', params.university);
    data.append('whereFind', params.whereFind);
    data.append('year', params.year);
  }

  fetchHashToken().then(tokenData => {
    data.append('hash', tokenData.hash);
    data.append('sessionId', tokenData.sessionId);

    return apiInteresneeInstance.post('/save-form.php', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });
}