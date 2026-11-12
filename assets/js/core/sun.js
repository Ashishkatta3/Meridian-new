/* ===========================================================
   SUNRISE AND SUNSET

   "Auto" should mean light while the sun is up and dark once it has
   set, which is not the same thing as the operating system's dark
   mode — that is a preference, not a time of day.

   The times are worked out here rather than fetched, so there is no
   key, no request and no location permission prompt. The maths is
   the standard sunrise equation; the only guess is WHERE you are,
   and for that the time zone is enough: an offset of -6 hours puts
   you around 90°W. Latitude is taken as the middle of the country,
   which moves sunset by at most a quarter of an hour across the
   lower 48 — close enough to decide a colour scheme.
   =========================================================== */

const SUN_DEFAULT_LAT = 38;          /* roughly mid-latitude US */

/* longitude implied by the browser's time zone */
function sunLongitude(){
  const offsetHours = -new Date().getTimezoneOffset() / 60;
  return Math.max(-180, Math.min(180, offsetHours * 15));
}

/* { sunrise: Date, sunset: Date } — or { alwaysUp } / { alwaysDown }
   inside the polar circles, where there is no sunrise to speak of */
function sunTimes(date, lat, lon){
  const rad = Math.PI / 180, DAY = 86400000;
  const julian = date.getTime() / DAY + 2440587.5;
  const n = Math.round(julian - 2451545.0 + 0.0008);
  /* Solar noon falls LATER in UTC the further west you are, so the
     longitude term is added for a western (negative) longitude. */
  const Jstar = n - lon / 360;                      /* mean solar noon */

  const M = (357.5291 + 0.98560028 * Jstar) % 360;  /* solar mean anomaly */
  const C = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
  const lambda = (M + C + 180 + 102.9372) % 360;    /* ecliptic longitude */
  const Jtransit = 2451545.0 + Jstar + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * lambda * rad);

  const delta = Math.asin(Math.sin(lambda * rad) * Math.sin(23.44 * rad));   /* declination */
  const cosOmega = (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * Math.sin(delta))
                 / (Math.cos(lat * rad) * Math.cos(delta));
  if (cosOmega > 1)  return { alwaysDown: true };   /* sun never rises */
  if (cosOmega < -1) return { alwaysUp: true };     /* never sets */

  const omega = Math.acos(cosOmega) / rad;
  const toDate = J => new Date((J - 2440587.5) * DAY);
  return { sunrise: toDate(Jtransit - omega / 360), sunset: toDate(Jtransit + omega / 360) };
}

/* Is it daylight where this browser is, right now? */
function isDaylight(when){
  const now = when || new Date();
  const t = sunTimes(now, SUN_DEFAULT_LAT, sunLongitude());
  if (t.alwaysUp) return true;
  if (t.alwaysDown) return false;
  return now >= t.sunrise && now < t.sunset;
}

/* how long until the next switch, so the page can flip by itself */
function msUntilSunChange(){
  const now = new Date();
  const t = sunTimes(now, SUN_DEFAULT_LAT, sunLongitude());
  if (t.alwaysUp || t.alwaysDown) return 6 * 3600000;
  let next = now < t.sunrise ? t.sunrise : now < t.sunset ? t.sunset : null;
  if (!next){                                        /* after today's sunset */
    const tm = sunTimes(new Date(now.getTime() + 86400000), SUN_DEFAULT_LAT, sunLongitude());
    next = tm.sunrise || new Date(now.getTime() + 6 * 3600000);
  }
  return Math.max(60000, Math.min(next - now + 1000, 6 * 3600000));
}
