using UnityEngine;
using System.Collections;

public class EventManagerBase : MonoBehaviour {
	// Use this for initialization
	public delegate void OnEvent();
	public static event OnEvent OnHomeScreenLoaded;
	public static event OnEvent OnLectureScreenLoaded;
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void TriggerHomeScreenLoaded()
	{
		if (OnHomeScreenLoaded != null)
			OnHomeScreenLoaded ();
	}

	public void TriggerLectureScreenLoaded()
	{
		if (OnLectureScreenLoaded != null)
			OnLectureScreenLoaded ();
	}
}
