using UnityEngine;
using System.Collections;
using MaterialUI;
public class HomeScreenLoad : MonoBehaviour {
	public GameObject mLectureDetailPrefab;
	public GameObject mScrollviewContent;
	private float mYear;
	private float mSemester;
	private GameObject[] mSearchedSubjectSet;
	// Use this for initialization
	void Start () {
		mYear = 1f;
		mSemester = 1f;
		SearchLectures ();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnEnable()
	{
		EventManagerBase.OnHomeScreenLoaded += SearchLectures;
	}

	void OnDisable()
	{
		EventManagerBase.OnHomeScreenLoaded -= SearchLectures;
	}

	public void SearchLectures()
	{
		mSearchedSubjectSet = GameObject.FindGameObjectsWithTag ("SubjectPrefab");

		foreach (GameObject g in mSearchedSubjectSet) 
		{
			Destroy (g);
		}
		StartCoroutine (LoadLectureDetailsFromServer(mYear,mSemester));
	}

	private IEnumerator LoadLectureDetailsFromServer(float year, float semester)
	{
		yield return new WaitForSeconds (2f);

		GameObject newgameobject = Instantiate (mLectureDetailPrefab);
		newgameobject.transform.parent = mScrollviewContent.transform;
	}

	public void OnYearValueChanged(float value)
	{
		mYear = value;
		SearchLectures ();
	}

	public void OnSemesterValueChanged(float value)
	{
		mSemester = value;
		SearchLectures ();
	}
}
