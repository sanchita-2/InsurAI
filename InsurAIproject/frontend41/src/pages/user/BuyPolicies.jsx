
import React, { useEffect, useState } from "react";
import { getPolicies, buyPolicy, getUserPolicies } from "../../api";
import "../../styles/home.css"
import { getCurrentUser } from "../../auth";
export default function BuyPolicies() {
 const loggedUser = getCurrentUser();
const userId = loggedUser?.id;

  const [policies, setPolicies] = useState([]);
  const [myPolicies, setMyPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    async function load() {
      try {
        const allPolicies = await getPolicies();
        setPolicies(allPolicies);

        if (userId) {
          const purchased = await getUserPolicies(userId);
          setMyPolicies(purchased);
        }
      } catch (err) {
        console.error("Failed to load policies", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  
  function isPurchased(policyId) {
    return myPolicies.some(p => p.policyId === policyId);
  }

  
  async function handleBuy(policyId) {
    try {
      await buyPolicy(userId, policyId);
      alert("Policy purchased successfully!");

   
      const updated = await getUserPolicies(userId);
      setMyPolicies(updated);
    } catch (err) {
      console.error("Buy failed", err);
      alert("Failed to buy policy");
    }
  }

  if (loading) return <p>Loading policies...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Buy Insurance Policies</h2>

      <div className="policy-grid">
        {policies.map(p => {
          const purchased = isPurchased(p.id);

          return (
            <div className="policy-card" key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p><strong>Premium:</strong> ₹{p.premium}</p>

              <button
                className="btn"
                disabled={purchased}
                onClick={() => handleBuy(p.id)}
                style={{
                  background: purchased ? "#9ca3af" : "#2563eb",
                  cursor: purchased ? "not-allowed" : "pointer"
                }}
              >
                {purchased ? "Purchased" : "Buy Policy"}
              </button>
            </div>
          );
        })}

        {policies.length === 0 && <p>No policies available.</p>}
      </div>
    </div>
  );
}
