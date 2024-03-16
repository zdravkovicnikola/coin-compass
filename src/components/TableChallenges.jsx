import React, { useState } from 'react'
import ChallengeItem from './ChallengeItem'

const TableChallenges = ({ challenges }) => {
    return (
        <div className="table">
          <table>
            <thead>
              <tr>
                {
                  ["Naziv", "Tip izazova", "Kategorija troška", "Zadati iznos","Kreiran", "Važi do", "Status"].map(
                    (i, index) => (
                    <th key={index}>{i}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {
                challenges.map((challenge) => (
                  <tr key={challenge.id}>
                      <ChallengeItem challenge={challenge}/>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )
}

export default TableChallenges