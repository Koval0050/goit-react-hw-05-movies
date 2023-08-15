import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './style.css';
import { Grid } from 'react-loader-spinner';

const Home = lazy(() => import('./Pages/Home'));
const Movies = lazy(() => import('./Pages/Movies'));
const Layout = lazy(() => import('./Layouts/Layout'));
const MovieDetail = lazy(() => import('./MovieDetail/MovieDetail'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const NotFound = lazy(() => import('./MovieDetail/NotFound'));

export const App = () => {
  const loader = (
    <Grid
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass="loader"
      visible={true}
    />
  );

  return (
    <div>
      <Suspense fallback={loader}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:movieId" element={<MovieDetail />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};
