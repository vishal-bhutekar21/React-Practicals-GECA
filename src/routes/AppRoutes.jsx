import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PracticalsList from '../practicals/PracticalsList';
import Practical01 from '../practicals/Practical01';
import Practical02 from '../practicals/Practical02';
import Practical03 from '../practicals/Practical03';
import Practical04 from '../practicals/Practical04';
import Practical05 from '../practicals/Practical05';
import Practical06 from '../practicals/Practical06';
import Practical07 from '../practicals/Practical07';
import Practical08 from '../practicals/Practical08';
import Practical09 from '../practicals/Practical09';
import Practical10 from '../practicals/Practical10';
import Practical11 from '../practicals/Practical11';
import Practical12 from '../practicals/Practical12';
import Practical13 from '../practicals/Practical13';
import Practical14 from '../practicals/Practical14';
import Practical15 from '../practicals/Practical15';
import GroceryDeliveryApp from '../practicals/GroceryDeliveryApp';
import NotFound from '../components/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PracticalsList />} />
      <Route path="/practicals/01" element={<Practical01 />} />
      <Route path="/practicals/02" element={<Practical02 />} />
      <Route path="/practicals/03" element={<Practical03 />} />
      <Route path="/practicals/04" element={<Practical04 />} />
      <Route path="/practicals/05" element={<Practical05 />} />
      <Route path="/practicals/06" element={<Practical06 />} />
      <Route path="/practicals/07" element={<Practical07 />} />
      <Route path="/practicals/08" element={<Practical08 />} />
      <Route path="/practicals/09" element={<Practical09 />} />
      <Route path="/practicals/10" element={<Practical10 />} />
      <Route path="/practicals/11" element={<Practical11 />} />
      <Route path="/practicals/12" element={<Practical12 />} />
      <Route path="/practicals/13" element={<Practical13 />} />
      <Route path="/practicals/14" element={<Practical14 />} />
      <Route path="/practicals/15" element={<Practical15 />} />
      <Route path="/mini-projects/grocery-delivery" element={<GroceryDeliveryApp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
