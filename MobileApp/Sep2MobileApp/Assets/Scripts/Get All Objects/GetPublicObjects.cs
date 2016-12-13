using UnityEngine;
using System.Collections;
using UnityEngine.UI;
public class GetPublicObjects : MonoBehaviour {
	public Text mNotificationText;
	public GameObject mScriptHolderObject;
	public static GameObject mScriptHolder;
	public GameObject mEnrolmentDialogBoxObject;
	public static GameObject mEnrolmentDialogBox;
	// Use this for initialization
	void Start () {
		mScriptHolder = mScriptHolderObject;
		mEnrolmentDialogBox = mEnrolmentDialogBoxObject;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
