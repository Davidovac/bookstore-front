import React, { useState, useEffect } from "react";
import "../styles.scss";
import { getIssuesPaged } from "../services/comics.service";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IssueForm from "../components/issueForm";

const ComicIssues = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search)
  const routeParams = useParams();
  const volumeId = routeParams.id;
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [paging, setPaging] = useState([])
  const [page, setPage] = useState(Number(params.get('page')) || 1)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const comicName = params.get('comicName')

  const formatImageUrl = (url) => {
    return url && url.replace(/\\\//g, "/").replace(/"/g, '');
  }

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.getDate() + '/' + (Number(newDate.getMonth()) + 1) + '/' + newDate.getFullYear();
  }

  const handlePrev = () => {
    let prevPage = 1;
    if (paging && page && (page > 1 && page <= paging.totalPages)) {
        prevPage = page - 1;
    }

    setPage(prevPage);
    params.set('page', (prevPage));
    navigate(`${location.pathname}?${params.toString()}`);
  }

 const handleNext = () => {
  let nextPage = 1;

  if (!paging || !page || (!isNaN(Number(page)) && page >= paging.totalPages)) {
    if (page == paging.totalPages) {
        nextPage = page;
    }
  }
  else {
    if (!isNaN(Number(page))) {
        nextPage = Number(page) + 1;
    }
  }

  setPage(nextPage);
  params.set('page', nextPage);
  navigate(`${location.pathname}?${params.toString()}`);
};

  useEffect(() => {
    const loadIssues = async () => {
    try {
      setLoading(true);
      const data = await getIssuesPaged(volumeId, page);
      setPaging(data || []);
      setIssues(data.items || []);
      setError('');
    } catch (error) {
      setError('Greska pri ucitavanju autora.');
    }
    setLoading(false);
  }
  loadIssues()
  }, [page]);

  if (loading) return <div id="loadingSpinner" className="spinner"></div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div id="comic-issues-container">
      <h3>Izdanja <i>{comicName}</i> serijala</h3>
      <div id="issues-card-container">
        <div className="paging-btn-block">
        <button className={page == 1 ? "hidden" : ""} onClick={handlePrev}>&lt;</button>
        </div>
        <div className="issues-card-block">
          {issues && (issues.length > 0) ? issues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <div>
                <img src={formatImageUrl(issue.image)} alt="" onClick={(e) => setSelectedIssue((prev) => (prev && prev.id == issue.id ? null : issue))}/>
                <p className="issue-number">{issue.issueNumber && issue.issueNumber.replace(/"/g, "")}</p>
              </div>
              <p title={issue.name} className="issue-name">{issue.name}</p>
              <p style={{textAlign: 'center', margin: 0}}>Datum izdavanja: {formatDate(issue.coverDate)}</p>
            </div>
          )) : (<h2 style={{color: 'black', textDecoration: 'unset'}}>Broj stranice {page} ne postoji!</h2>)}
          {issues.length == 0 && <p>Nema rezultata</p>}
        </div>
        <div className="paging-btn-block">
        <button className={page < paging.totalPages ? "" : "hidden"} onClick={handleNext}>&gt;</button>
        </div>
      </div>
      <p style={{textAlign: "center"}}>{page ? page : ""}</p>
      {selectedIssue && <IssueForm volumeId={volumeId} issue={selectedIssue} setSelectedIssue={setSelectedIssue}/>}
    </div>
  );
}
export default ComicIssues;