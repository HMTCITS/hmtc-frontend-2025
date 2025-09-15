'use client'
import React from 'react';

import { Table } from '@/components/ui/table';

export default function TableSandbox() {
  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Table</h1>
      <section className='space-y-4'>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>28</td>
              <td>New York</td>
              <td>USA</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>34</td>
              <td>London</td>
              <td>UK</td>
            </tr>
            <tr>
              <td>Michael Johnson</td>
              <td>45</td>
              <td>Toronto</td>
              <td>Canada</td>
            </tr>
          </tbody>
        </Table>
      </section>
    </main>
  )
}